import { useState, useMemo } from 'react';
import { Bell } from 'lucide-react';
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useChangeStatusNotificationMutation,
} from '../../../redux/apiSlices/notificationSlice';
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

// Types for notification
interface Notification {
  id: string;
  timestamp: string;
  createdAt: string;
  message: string;
  avatar: string;
  read: boolean;
}

interface ApiNotification {
  _id: string;
  receiver: string;
  sender: string | null;
  title: string;
  message: string;
  refId: string;
  path: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to format timestamps
function getTimestampLabel(dateStr: string) {
  const date = new Date(dateStr);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'dd MMM yyyy');
}

export default function NotificationPage() {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const {
    data: notificationsData,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
    refetch: refetchNotifications,
  } = useGetNotificationQuery({ page, limit });

  const [readAll, { isLoading: isReadAllLoading }] = useReadAllNotificationMutation();
  const [markSeen, { isLoading: isMarkSeenLoading }] = useChangeStatusNotificationMutation();

  // Map notifications API response to internal Notification shape
  const notifications: Notification[] = useMemo(() => {
    if (!notificationsData?.data) return [];
    return (notificationsData.data as ApiNotification[]).map((notif) => ({
      id: notif._id,
      timestamp: getTimestampLabel(notif.createdAt),
      createdAt: notif.createdAt,
      message: notif.message || notif.title,
      avatar: '👤',
      read: notif.seen,
    }));
  }, [notificationsData]);

  // Group notifications by 'Today'/'Yesterday'/date label
  const groupedNotifications = useMemo(() => {
    return notifications.reduce((acc: Record<string, Notification[]>, notif) => {
      const { timestamp } = notif;
      if (!acc[timestamp]) {
        acc[timestamp] = [];
      }
      acc[timestamp].push(notif);
      return acc;
    }, {} as Record<string, Notification[]>);
  }, [notifications]);

  // Handler for mark all as read
  const handleReadAll = async () => {
    try {
      await readAll({});
      refetchNotifications();
    } catch {
      // Optionally handle error
    }
  };

  // Handler for marking a notification as seen (individual)
  const handleMarkSeen = async (notifId: string, alreadySeen: boolean) => {
    // Only mark as seen if not already seen
    if (alreadySeen) return;
    try {
      await markSeen({ id: notifId });
      refetchNotifications();
    } catch {
      // Optionally handle error
    }
  };

  // Determine if there's any unread notification
  const hasUnread = notifications.some((notif) => !notif.read);

  const groupedList: [string, Notification[]][] = Object.entries(groupedNotifications);

  // Pagination data
  const totalNotifications = notificationsData?.pagination?.total || 0;
  const totalPages = notificationsData?.pagination?.totalPage || 1;
  const currentPage = notificationsData?.pagination?.page || page;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="bg-gray-50">
      <div>
        <div className="bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 transition text-white text-sm font-semibold shadow-sm border border-teal-500"
              onClick={handleReadAll}
              disabled={!hasUnread || isReadAllLoading}
              style={{
                opacity: hasUnread && !isReadAllLoading ? 1 : 0.6,
                cursor: hasUnread && !isReadAllLoading ? 'pointer' : 'not-allowed'
              }}
              type="button"
            >
              {isReadAllLoading ? "Marking..." : "Mark all as read"}
            </button>
          </div>

          {/* Loading/Fetching State */}
          {isNotificationsLoading && (
            <div className="w-full p-10 flex justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          )}

          {/* Error State */}
          {isNotificationsError && (
            <div className="w-full p-10 flex justify-center">
              <span className="text-red-400">Failed to load notifications.</span>
            </div>
          )}

          {/* Main List */}
          {!isNotificationsLoading && !isNotificationsError && groupedList.length > 0 && groupedList.map(([timestamp, items]) => (
            <div key={timestamp}>
              {/* Group Header */}
              <div className="px-6 py-3">
                <p className="text-sm font-medium text-gray-600">{timestamp}</p>
              </div>

              {/* Notification Items */}
              {items.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4`}
                  onClick={() => handleMarkSeen(notif.id, notif.read)}
                  tabIndex={0}
                  style={{ outline: 'none' }}
                >
                  {/* Status Indicator */}
                  <div className={`w-2.5 h-2.5 mt-4 rounded-full flex-shrink-0 ${!notif.read ? 'bg-green-500' : 'bg-transparent'}`} />

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{notif.avatar}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className={`text-gray-900 font-medium ${!notif.read ? '' : 'opacity-80'}`}>{notif.message}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {/* Individual "Mark as read" Button */}
                    {!notif.read && (
                      <button
                        className="ml-2 px-2 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200 transition disabled:opacity-60"
                        disabled={isMarkSeenLoading}
                        onClick={e => {
                          e.stopPropagation();
                          handleMarkSeen(notif.id, notif.read);
                        }}
                        type="button"
                      >
                        {isMarkSeenLoading ? "Marking..." : "Mark as read"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Empty State Fallback */}
          {!isNotificationsLoading && !isNotificationsError && groupedList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No notifications</p>
              <p className="text-sm text-gray-400">You're all caught up!</p>
            </div>
          )}

          {/* Pagination */}
          {!isNotificationsLoading && !isNotificationsError && totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <button
                className="px-3 py-1 rounded text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage <= 1}
                onClick={() => handleChangePage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="text-gray-700 text-sm">
                Page {currentPage} of {totalPages} — {totalNotifications} Notifications
              </span>
              <button
                className="px-3 py-1 rounded text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage >= totalPages}
                onClick={() => handleChangePage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
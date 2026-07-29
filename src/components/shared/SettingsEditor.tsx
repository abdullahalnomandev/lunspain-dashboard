import { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import Swal from 'sweetalert2';
import NoteTab from './NoteTab';
import { ISetting, SettingPayload } from '../../types/types';

type SettingsEditorProps = {
    title: string;
    data?: ISetting;
    isLoading: boolean;
    isSaving: boolean;
    onSave: (payload: SettingPayload) => Promise<unknown>;
};

export default function SettingsEditor({ title, data, isLoading, isSaving, onSave }: SettingsEditorProps) {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (data?.description != null) {
            setContent(data.description);
        }
    }, [data?.description]);

    const handleSave = () => {
        Swal.fire({
            title: 'Save changes?',
            text: `Update ${title}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it',
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await onSave({ description: content });
                Swal.fire('Saved!', `${title} updated successfully.`, 'success');
            } catch {
                Swal.fire('Error!', `Failed to save ${title}.`, 'error');
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <Button type="primary" loading={isSaving} onClick={handleSave}>
                    Save
                </Button>
            </div>
            <NoteTab content={content} handleContentChange={setContent} />
        </div>
    );
}

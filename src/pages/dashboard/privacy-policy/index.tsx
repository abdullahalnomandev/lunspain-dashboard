import SettingsEditor from '../../../components/shared/SettingsEditor';
import {
    useGetPrivacyPolicySettingsQuery,
    useUpdatePrivacyPolicySettingsMutation,
} from '../../../redux/apiSlices/privacyPolicySettingsSlice';

export default function PrivacyPolicy() {
    const { data, isLoading } = useGetPrivacyPolicySettingsQuery();
    const [updatePrivacyPolicySettings, { isLoading: isSaving }] = useUpdatePrivacyPolicySettingsMutation();

    return (
        <SettingsEditor
            title="Privacy Policy"
            data={data}
            isLoading={isLoading}
            isSaving={isSaving}
            onSave={(payload) => updatePrivacyPolicySettings(payload).unwrap()}
        />
    );
}

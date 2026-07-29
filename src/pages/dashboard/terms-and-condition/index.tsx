import SettingsEditor from '../../../components/shared/SettingsEditor';
import {
    useGetTermsOfServiceSettingsQuery,
    useUpdateTermsOfServiceSettingsMutation,
} from '../../../redux/apiSlices/termsOfServiceSettingsSlice';

export default function TermsAndCondition() {
    const { data, isLoading } = useGetTermsOfServiceSettingsQuery();
    const [updateTermsOfServiceSettings, { isLoading: isSaving }] = useUpdateTermsOfServiceSettingsMutation();

    return (
        <SettingsEditor
            title="Terms of Service"
            data={data}
            isLoading={isLoading}
            isSaving={isSaving}
            onSave={(payload) => updateTermsOfServiceSettings(payload).unwrap()}
        />
    );
}

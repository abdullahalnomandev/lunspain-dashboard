import SettingsEditor from '../../../components/shared/SettingsEditor';
import {
    useGetDisclaimerSettingsQuery,
    useUpdateDisclaimerSettingsMutation,
} from '../../../redux/apiSlices/disclaimerSettingsSlice';

export default function Disclaimer() {
    const { data, isLoading } = useGetDisclaimerSettingsQuery();
    const [updateDisclaimerSettings, { isLoading: isSaving }] = useUpdateDisclaimerSettingsMutation();

    return (
        <SettingsEditor
            title="Disclaimer"
            data={data}
            isLoading={isLoading}
            isSaving={isSaving}
            onSave={(payload) => updateDisclaimerSettings(payload).unwrap()}
        />
    );
}

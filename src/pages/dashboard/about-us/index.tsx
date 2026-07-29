import SettingsEditor from '../../../components/shared/SettingsEditor';
import {
    useGetAboutSettingsQuery,
    useUpdateAboutSettingsMutation,
} from '../../../redux/apiSlices/aboutSettingsSlice';

export default function AboutUs() {
    const { data, isLoading } = useGetAboutSettingsQuery();
    const [updateAboutSettings, { isLoading: isSaving }] = useUpdateAboutSettingsMutation();

    return (
        <SettingsEditor
            title="About Us"
            data={data}
            isLoading={isLoading}
            isSaving={isSaving}
            onSave={(payload) => updateAboutSettings(payload).unwrap()}
        />
    );
}

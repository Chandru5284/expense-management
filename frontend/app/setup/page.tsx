import { cookies } from 'next/headers'

// import components
import CreateMemberModal from "@/components/modals/CreateMemberModal";
import RedirectToDashboard from '@/components/redirect/RedirectToDashboard';

const SetupPage = () => {
    const cookieStore = cookies()
    const is_require_member_info = cookieStore.get('require_member_info')?.value

    if (is_require_member_info == "true") {
        return <CreateMemberModal />
    }
    else {
        return <RedirectToDashboard />
    };
}
export default SetupPage;

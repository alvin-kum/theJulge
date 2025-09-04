import { withAuth } from "@/lib/guards";
import ShopEditor from "@/pagesParts/shop/ShopEditor";
export default withAuth(function Page(){ return <ShopEditor mode="create" />; });

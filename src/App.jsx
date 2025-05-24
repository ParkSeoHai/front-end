import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import UserLayout from "./page/users/UserLayout";
import AdminLayout from "./page/admin/AdminLayout";
import AddPromotion from "./page/admin/promotion_management/AddPromotion";
import EditPromotion from "./page/admin/promotion_management/EditPromotion";
import AddSupplier from "./page/admin/supplier_management/AddSupplier";
import EditSupplier from "./page/admin/supplier_management/EditSupplier";
import Home from "./page/users/home/Home";
import Cart from "./page/users/cart/Cart";
import ProductDetail from "./page/users/product_details/ProductDetail";
import Profile from "./page/users/profile/Profile";
import Order from "./page/users/order/Order";
import CategoryManagement from "./page/admin/categories_management/CategoryManagement";
import OrderManagement from "./page/admin/order_management/OrderManagement";
import ProductManagement from "./page/admin/product_management/ProductManagement";
import PromotionManagement from "./page/admin/promotion_management/PromotionManagement";
import SupplierManagement from "./page/admin/supplier_management/SupplierManagement";
import UserManagement from "./page/admin/user_management/UserManagement";
import AddProduct from "./page/admin/product_management/AddProduct";
import EditProduct from "./page/admin/product_management/EditProduct";
import Login from "./page/users/auth_user/Login";
import Register from "./page/users/auth_user/Register";
import AddUser from "./page/admin/user_management/AddUser";
import EditUser from "./page/admin/user_management/EditUser";
import LoginAdmin from "./page/admin/auth_admin/LoginAdmin";
import CategoryDetail from "./page/admin/categories_management/CategoryDetail";
import Dashboard from "./page/admin/DashBoard/DashBoard";
import TShirts from "./page/users/product/casual-wear/t-shirts/T-shirts";
import Shorts from "./page/users/product/casual-wear/shorts/Shorts";
import Blazers from "./page/users/product/office-wear/blazers/blazers";
import OfficeDresses from "./page/users/product/office-wear/dresses/dresses";
import OfficeShirts from "./page/users/product/office-wear/shirts/shirts";
import OfficeSkirts from "./page/users/product/office-wear/skirts/skirts";
import PartyDresses from "./page/users/product/party-wear/dresses/dresses";
import EveningGowns from "./page/users/product/party-wear/gowns/gowns";
import BabydollDresses from "./page/users/product/spring-summer/babydoll/babydoll";
import FloralDresses from "./page/users/product/spring-summer/floral/floral";
import MaxiDresses from "./page/users/product/spring-summer/maxi/maxi";
import StrapDresses from "./page/users/product/spring-summer/strap-dresses/strap-dresses";
import Bags from "./page/users/product/accessories/bags/bags";
import Glasses from "./page/users/product/accessories/glasses/glasses";
import Hats from "./page/users/product/accessories/hats/hats";
import Jewelry from "./page/users/product/accessories/jewelry/jewelry";
import Sales from "./page/users/product/sale/Sale";
import WarehouseManagement from "./page/admin/warehouse_management/WarehouseManagement";
import WarehouseForm from "./page/admin/warehouse_management/WarehouseForm";
import WarehouseDetail from "./page/admin/warehouse_management/WarehouseDetail";
import OrderDetail from "./page/admin/order_management/OrderDetail";
import SearchResults from "./page/users/product/search/SearchResults";
import Collection from "./page/users/product/collection/Collection";
import Checkout from "./page/users/checkout/Checkout";
import Favorites from "./page/users/favorites/Favorites";
import ProfileAdmin from './page/admin/auth_admin/Profile';
import Settings from './page/admin/auth_admin/Settings';
import ForgotPassword from './page/users/auth_user/ForgotPassword';
import ResetPassword from './page/users/auth_user/ResetPassword';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth">
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="admin">
          <Route path="login" element={<LoginAdmin />} />
        </Route>
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="sale" element={<Sales />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Profile />} />
        <Route path="order" element={<Order />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="collection/:collectionName" element={<Collection />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="casual-wear">
          <Route path="t-shirts" element={<TShirts />} />
          <Route path="shorts" element={<Shorts />} />
        </Route>
        <Route path="office-wear">
          <Route path="blazers" element={<Blazers />} />
          <Route path="dresses" element={<OfficeDresses />} />
          <Route path="shirts" element={<OfficeShirts />} />
          <Route path="skirts" element={<OfficeSkirts />} />
        </Route>
        <Route path="party-wear">
          <Route path="dresses" element={<PartyDresses />} />
          <Route path="gowns" element={<EveningGowns />} />
        </Route>
        <Route path="spring-summer">
          <Route path="babydoll" element={<BabydollDresses />} />
          <Route path="floral" element={<FloralDresses />} />
          <Route path="maxi" element={<MaxiDresses />} />
          <Route path="strap-dresses" element={<StrapDresses />} />
        </Route>
        <Route path="accessories">
          <Route path="bags" element={<Bags />} />
          <Route path="glasses" element={<Glasses />} />
          <Route path="hats" element={<Hats />} />
          <Route path="jewelry" element={<Jewelry />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories">
          <Route index element={<CategoryManagement />} />
          <Route path=":id" element={<CategoryDetail />} />
        </Route>
        <Route path="orders">
          <Route index element={<OrderManagement />} />
          <Route path=":id" element={<OrderDetail />} />
        </Route>
        <Route path="products">
          <Route index element={<ProductManagement />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="promotions">
          <Route index element={<PromotionManagement />} />
          <Route path="add" element={<AddPromotion />} />
          <Route path="edit/:id" element={<EditPromotion />} />
        </Route>
        <Route path="suppliers">
          <Route index element={<SupplierManagement />} />
          <Route path="add" element={<AddSupplier />} />
          <Route path="edit/:id" element={<EditSupplier />} />
        </Route>
        <Route path="users">
          <Route index element={<UserManagement />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>
        <Route path="warehouses">
          <Route index element={<WarehouseManagement />} />
          <Route path="import" element={<WarehouseForm />} />
          <Route path="export" element={<WarehouseForm />} />
          <Route path=":id" element={<WarehouseDetail />} />
        </Route>
        <Route path="/admin/profile" element={<ProfileAdmin />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/user" replace />} />
    </Routes>
  );
}

export default App;

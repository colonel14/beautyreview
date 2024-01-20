import DashboardNav from "./DashboardNav";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <DashboardNav className="mx-6" />
      </div>
    </div>
  );
};

export default Navbar;

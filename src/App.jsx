import { Suspense } from "react"
import AppRoutes from "./app/routing/AppRoutes"
import Loader from "./app/components/Loader"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <Toaster position="top-right" expand={false} richColors={false} />
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </>
  );
};

export default App

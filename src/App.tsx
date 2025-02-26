import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { CurrentScreenProvider } from "./context/currentScreenContext";
import { OpenDeleteDialogProvider } from "./context/openDeleteDialog";
import { PermissionProvider } from "./context/permissionContext";
import { SidebarProvider } from "./context/sidebarContext";
import routes from "./routes/routes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: (prev: any) => prev,
      },
    },
  });
  return (
    <SidebarProvider>
      <CurrentScreenProvider>
        <OpenDeleteDialogProvider>
          <PermissionProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
              <Toaster
                toastOptions={{
                  unstyled: false,
                  classNames: {
                    toast: "bg-primary",
                    title: "text-white",
                    success: "!text-white bg-green-500!",
                    error: "bg-red-500! !text-white",
                  },
                }}
              />
            </QueryClientProvider>
          </PermissionProvider>
        </OpenDeleteDialogProvider>
      </CurrentScreenProvider>
    </SidebarProvider>
  );
}

export default App;

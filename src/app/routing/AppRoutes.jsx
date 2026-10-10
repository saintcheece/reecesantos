import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ErrorsPage } from "../pages/errors/ErrorsPage";
import Layout from "../pages/layout/Layout";
import { PROJECTS } from "../constants/routes";

const LayoutWrapper = ({children, currentPageName}) =>
    Layout ? (
        <Layout currentPageName={currentPageName}>{children}</Layout>
    ) : (
        <>{children}</> 
    );

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="error/*" element={<ErrorsPage />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="projects" element={
                <LayoutWrapper>
                    <SuspensedView>
                        <Outlet/>
                    </SuspensedView>
                </LayoutWrapper>
            }>
                {PROJECTS.map(project => (
                    <Route 
                        key={project.url}
                        path={project.url}
                        element={<project.page />} 
                    />
                ))} 
            </Route>
        </Routes>
    );
};

export default AppRoutes;
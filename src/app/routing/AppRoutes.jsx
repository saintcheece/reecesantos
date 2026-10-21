import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ErrorsPage } from "../pages/errors/ErrorsPage";
import Overview from "../pages/Overview";
import Layout from "../pages/layout/Layout";
import { Suspense } from "react";
import { PROJECTS } from "../../data/projects";

const LayoutWrapper = ({children, currentPageName}) =>
    Layout ? (
        <Layout currentPageName={currentPageName}>{children}</Layout>
    ) : (
        <>{children}</> 
    );

const SuspensedView = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};


const AppRoutes = () => {
    return (

        
        <Routes>
            <Route 
                path="error/*"
                element={<ErrorsPage />}
            />
            <Route 
                path=""
                element={
                    <LayoutWrapper>
                        <Overview />
                    </LayoutWrapper>
                }
            />
            <Route
                path="projects"
                element={
                    <LayoutWrapper>
                        <SuspensedView>
                            <Outlet/>
                        </SuspensedView>
                    </LayoutWrapper>
                }
            >
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
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Provider/AuthProvider';
import router from './Router/router';
import './index.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
            </RouterProvider>
        </QueryClientProvider>
    </AuthProvider>
)

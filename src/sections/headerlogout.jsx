import React from 'react';

function HeaderLogout() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'white' }}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1"></div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 mr-5">
                        Login <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a href="/register" className="text-sm font-semibold leading-6 text-gray-900">
                        Register <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default HeaderLogout;

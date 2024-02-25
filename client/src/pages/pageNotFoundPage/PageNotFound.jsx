function PageNotFound() {
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-100">
            <div className="max-w-xl mx-auto px-6 overflow-hidden">
                <div className="flex items-center">
                    <div className="px-4 text-lg text-slate-900  border-r border-gray-400 tracking-wider">
                        404
                    </div>
                    <div className="ml-4 text-lg text-slate-900 uppercase tracking-wider">
                        This page could not be found.
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PageNotFound;

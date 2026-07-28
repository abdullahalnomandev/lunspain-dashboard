
export default function ServiceDeck() {

    return (
        <div>
            <div className="max-w-4xl">
                {/* Header */}
                <div className="mb-4 border-b-[1.5px] border-primary pb-2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Service <span className="text-orange-500 font-bold"> Deck</span>
                    </h1>
                    <p className="text-gray-600">Ready-made company pitch deck showcasing Betopia's services. Use this deck to present our capabilities to your clients and prospects.</p>

                    <p className="text-gray-500 text-sm mt-2 bg-[#FEFAEB] inline-block px-4 py-2 rounded-lg">
                        Always updated with latest services & case studies.
                    </p>
                </div>


                {/* Service Deck Card */}
                <div className="bg-[#F6F9F3] p-4 rounded-2xl max-w-[615px] border-primary/40 shadow-lg border overflow-hidden">
                    {/* Presentation Preview */}
                    <div className="relative">
                        <div className="flex bg-gray-100 rounded-t-2xl overflow-hidden">
                            {/* Orange sidebar */}
                            <div className="bg-primary text-white p-8 w-48 md:w-72  flex flex-col justify-center">
                                <div className="text-sm mb-2 opacity-90 absolute top-4">betopia</div>
                                <div className="text-xs mb-2 opacity-75">Hi everyone 👋</div>
                                <h2 className="text-2xl font-bold leading-tight">
                                    Betopia Limited<br />
                                    Service Deck
                                </h2>
                            </div>

                            {/* Team photo */}
                            <div className="flex-1 bg-gray-200 min-h-64 flex items-center justify-center relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                    alt="Business team collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Betopia Limited : Service Deck for Partner
                        </h3>
                        <p className="text-gray-500 mb-6 font-bold">
                            A professional presentation with details of AI, Cloud, Cybersecurity, ERP, and Digital Solutions.
                        </p>

                        {/* Action Buttons */}
                        <div className="md:flex gap-4 mb-6">
                            <button
                                className="w-full md:w-auto bg-orange-50 text-primary px-8 py-3 rounded-lg font-medium hover:bg-orange-100 transition-colors border border-orange-200"
                            >
                                Preview Deck
                            </button>
                            <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-12 py-3 rounded-lg font-medium transition-colors mt-3 md:mt-0">
                                Download PDF
                            </button>
                        </div>

                        {/* Footer Info */}
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Last Update : 15 September, 2025.</span>
                            <span>Size : 2.5 MB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
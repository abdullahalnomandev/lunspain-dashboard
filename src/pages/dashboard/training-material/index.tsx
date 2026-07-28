import { FaPlay } from "react-icons/fa";

const trainingMaterials = [
    {
        title: "Service Deck",
        description: "A professional presentation with details of AI, Cloud, Cybersecurity, ERP, and Digital Solutions.",
        fileUrl: "/downloads/service-deck.pdf",
        previewImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        lastUpdate: "15 September, 2025",
        type: "pdf"
    },
    {
        title: "Sales Training Video",
        description: "Video tutorial on how to pitch Betopia services effectively.",
        fileUrl: "/videos/sales-training.mp4",
        previewImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
        lastUpdate: "1 July, 2025",
        type: "video"
    },
    {
        title: "Onboarding Guide",
        description: "Step-by-step onboarding manual for new partners",
        fileUrl: "/downloads/onboarding-guide.pdf",
        previewImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
        lastUpdate: "10 August, 2025",
        type: "pdf"
    },
 
];

export default function TrainingMaterial() {
    const handleAction = (material: any) => {
        if (material.type === 'video') {
            // For video, you might want to open in a modal or navigate to video page
            window.open(material.fileUrl, '_blank');
        } else {
            // For PDF, download
            const link = document.createElement('a');
            link.href = material.fileUrl;
            link.download = material.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className=" max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-4 border-b-[1.5px] border-primary pb-2 max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Training  <span className="text-primary font-bold"> Material</span>
                </h1>
                <p className="text-gray-600">Access training resources, guides, and tutorials to help you get the most out of Betopia partner program.</p>

                <p className="text-gray-500 text-sm mt-2 bg-[#FEFAEB] inline-block px-4 py-2 rounded-lg">
                    Updated regularly with new learning modules & tutorials..
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {trainingMaterials.map((material, idx) => (
                    <div
                        key={idx}
                        className="bg-[#F6F9F3] shadow-lg p-4 rounded-2xl max-w-[615px] border-primary/40 border overflow-hidden flex flex-col"
                    >
                        {/* Preview */}
                        <div className="relative bg-black/50 rounded-2xl">
                            <div className="flex bg-gray-100 rounded-t-2xl overflow-hidden">
                                {/* Orange sidebar */}
                                <div className="bg-primary text-white p-8 w-48 md:w-56 flex flex-col justify-center relative">
                                    <div className="text-sm mb-2 opacity-90 absolute top-4 left-8">betopia</div>
                                    <div className="text-xs mb-2 opacity-75">Hi everyone 👋</div>
                                    <h2 className="text-xl font-bold leading-tight">
                                        Betopia Limited<br />
                                        {material.title}
                                    </h2>
              
                                </div>
                                {/* Preview image */}
                                <div className="flex-1 bg-gray-200  min-h-64 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={material.previewImg}
                                        alt={`${material.title} preview`}
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: 'center' }}
                                    />
                                    {material.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <div className="bg-white rounded-full p-3 flex items-center justify-center cursor-pointer">
                                                <FaPlay className="text-primary" fontSize={20} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Card Content */}
                        <div className="p-6 pb-2 flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {material.title}
                            </h3>
                            <p className="text-gray-500 mb-6 font-bold">
                                {material.description}
                            </p>
                            <button
                                onClick={() => handleAction(material)}
                                className="w-full md:w-auto bg-primary hover:bg-primary/80 text-white px-12 py-3 rounded-lg font-medium transition-colors mt-3 md:mt-0 text-center"
                            >
                                {material.type === 'video' ? 'Watch Video' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>);
}
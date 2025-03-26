import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function Cromaheaders() {
    const categories = [
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/13_fbzbpw.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/12_hfsle3.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682983/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/8_dvwyxd.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/7_uvvozm.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/5_pjm9wd.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/5_pjm9wd.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/11_tc1idk.png?tr=w-720'},
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/4_wmg1qj.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/3_voajbz.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/2_bki1il.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/14_xtc6jg.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/1_maspxu.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/10_iobxyi.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682983/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/9_rqohp4.png?tr=w-720' },
        { imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/6_cruwwo.png?tr=w-720' },
        
    ];
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const [visibleCategories, setVisibleCategories] = useState([]);
    
    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        setVisibleCategories(categories.slice(startIndex, startIndex + itemsPerPage));
    }, [currentPage]);
    
    return (
        <div className="bg-gray-900 text-white min-h-screen px-4 sm:px-10 md:px-20 lg:px-40 py-6">
            <div className="relative flex items-center justify-between">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentPage === 0}>
                    <ChevronLeft size={24} />
                </button>
                
                <div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-5 gap-4 w-full max-w-6xl mx-auto">
                    {visibleCategories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center cursor-pointer">
                            <img 
                                src={category.imageUrl} 
                                className=" w-50 h-40 rounded-lg overflow-hidden shadow-lg"/>
                           
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentPage === totalPages - 1}>
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${currentPage === i ? 'bg-white' : 'bg-gray-600'}`} />
                ))}
            </div>

        
        </div>
    );
}











import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Time_offers from './Time_offers';

export default function Bank_Offers() {
    const categories = [
        { name: 'Mobiles', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746332/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Mobile_sdtrdf.png?tr=w-720' },
        { name: 'Televisions', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746346/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/TV_vdemgc.png?tr=w-720' },
        { name: 'Air Conditioners', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746308/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Air_Conditioner_a4hg1z.png?tr=w-720' },
        { name: 'Coolers', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1739259222/Croma%20Assets/CMS/LP%20Page%20Banners/2025/LP_Cooler_ak2tjf.png?tr=w-720' },
        { name: 'Laptops', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746331/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Laptops_pzewpv.png?tr=w-720' },
        { name: 'Headphones & Earphones', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746312/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Head_set_xjj934.png?tr=w-720' },
        { name: 'Fans', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746309/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Fans_ecnoxj.png?tr=w-720' },
        { name: 'Refrigerators', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746333/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Ref_biysg7.png?tr=w-720' },
        { name: 'Accessories', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746308/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Accessories_kefony.png?tr=w-720' },
        { name: 'Washing Machines', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746346/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Washing_machines_izyrnd.png?tr=w-720' },
        { name: 'Cameras', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616445/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Cameras_a6n2jy.png?tr=w-720' },
        { name: 'Speakers', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616447/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Speaker_g2mbgn.png?tr=w-720' },
        { name: 'Tablets', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746345/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Tablets_yzod4f.png?tr=w-720' },
        { name: 'Kitchen Appliances', imageUrl: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746312/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Kitchen_Appliances_yhzevo.png?tr=w-720' },
       
    ];
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const [visibleCategories, setVisibleCategories] = useState([]);
    
    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        setVisibleCategories(categories.slice(startIndex, startIndex + itemsPerPage));
    }, [currentPage]);
    
    return (
        <div className="bg-gray-900 text-white min-h-screen px-4 sm:px-10 md:px-20 lg:px-40 py-16">
            <div className="relative flex items-center justify-between">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                    disabled={currentPage === 0}>
                    <ChevronLeft size={24} />
                </button>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8  w-full max-w-5xl mx-auto">
                    {visibleCategories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center cursor-pointer">
                            <img 
                                src={category.imageUrl} 
                                alt={category.name} 
                                className="w-24 h-24 sm:w-28 sm:h-28 object-contain"/>
                           
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

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 ">Exciting Bank Offers For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src="https://media.croma.com/image/upload/v1721197736/Croma%20Assets/CMS/Homepage%20Banners/neu_offers_desk_tkq4lf.png" alt="Offer 1" className="w-full rounded-lg" />
                    <img src="https://media.croma.com/image/upload/v1717075769/Croma%20Assets/CMS/LP%20Page%20Banners/2024/BAU/HP_2Split_MFYMP_Brands_HDFC_ICIC_30May2024_kzbaou.png" alt="Offer 2" className="w-full rounded-lg" />
                    <img src="https://media.croma.com/image/upload/v1728297128/Croma%20Assets/CMS/LP%20Page%20Banners/2024/More%20For%20Your%20Money/October/BAU/Mon%20-%20AU/HP_Singlesplit_AU_1july2024_croge1.png" alt="Offer 3" className="w-full rounded-lg md:col-span-2" />
                </div>
            </div>

            <Time_offers/>
            
        </div>
    );
}

import React from 'react'
import { LogOut, UserCircle2 } from 'lucide-react';

function Sidebar() {
    return (
        <div className="bg-[#0b1f4e] text-white w-64 min-h-screen flex flex-col justify-between h-185">
            <div>
                {/* Top Profile Section */}
                <div className="flex items-center px-4 py-6 border-b border-white/10">
                    <UserCircle2 size={32} />
                    <div className="text-sm leading-tight">
                        <p className="font-semibold">Shree Kaushal Prem</p>
                        <p className="text-xs text-white/70">Metal</p>
                    </div>
                </div>

                <nav className="mt-4 space-y-2 px-4">
                    <a href="/dashboard"><NavItem label="Dashboard" /></a>
                    <a href="/customerinfo"><NavItem label="customer" /></a>
                    <a href="/inventorypage"><NavItem label="inventory" /></a>
                    <a href="/customerpage"><NavItem label="Settings" /></a>
                </nav>
            </div>


            <div className="px-4 py-6">
                <button className="flex items-center gap-2 text-white hover:text-red-500">
                    <LogOut size={18} />
                    <span>LOGOUT</span>
                </button>
            </div>
        </div>
    );
}

function NavItem({ label }) {
    return (
        <div className="flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded-lg cursor-pointer">
            <div className="h-3 w-3 bg-gray-300 rounded-full" />
            <span className="capitalize">{label}</span>
        </div>
    )
}

export default Sidebar
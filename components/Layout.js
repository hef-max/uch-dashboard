// components/Layout.js
import { React } from 'react';
import AlertDialogComponent from "@/components/AlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
        const res = await fetch("http://160.19.166.39:5000/logout", {
            method: "GET",
            credentials: 'include'
        });
  
        if (res.ok) {
            document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("http://160.19.166.39:3000/");
        } else {
            console.log("Logout not successfully");
        }
    } catch (error) {
        router.push("/");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ padding: '10px', backgroundColor: '#394b81', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>IoT Klitih Detection Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AlertDialogComponent 
                alertDialogAction="Logout" 
                alertDialogCancel="Cancel"
                onActionClick={handleLogout}
                alertDialogTitle="Apakah Anda yakin ingin keluar dari halaman ini?"
            >
            <div className="flex items-center rounded hover:bg-blue-600 cursor-pointer">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                <span style={{ marginLeft: '8px' }}>Logout</span>
            </div>
          </AlertDialogComponent>
        </div>
      </header>
      <main style={{ flex: '1', padding: '20px', backgroundColor: 'white', color: 'black', position: 'relative'  }}>
        {children}
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#394b81', color: 'white', textAlign: 'center' }}>
        © 2024 UTY Creative Hub
      </footer>
    </div>
  );
}

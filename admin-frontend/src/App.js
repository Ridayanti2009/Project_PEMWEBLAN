import React from "react";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const dummyData = {
    total: 10,
    dikaji: 2,
    diselidiki: 3,
    selesai: 5,
    laporan: {
      judul: "Penyalahgunaan Dana",
      kategori: "Keuangan",
      tanggal: "2025-05-22",
      lokasi: "Kantor Pusat",
      nama: "Anonim",
      anonim: true
    }
  };

  return (
    <div className="App">
      <AdminDashboard 
        total={dummyData.total}
        dikaji={dummyData.dikaji}
        diselidiki={dummyData.diselidiki}
        selesai={dummyData.selesai}
        laporan={dummyData.laporan}
      />
    </div>
  );
}

export default App;
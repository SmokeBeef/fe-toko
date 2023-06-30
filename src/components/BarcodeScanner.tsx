// "use client";
// import React, { useState } from "react";
// import { QrReader, QrReaderProps } from "react-qr-reader";

// function BarcodeScanner() {
//   const [result, setResult] = useState<string | null>(null);

//   const handleScan = (data: any) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const handleError = (error: any) => {
//     console.error(error);
//   };

//   return (
//     <div>
//       <QrReader
//         constraints={{
          
//           width: 640 ,
//           height: 400,
//           frameRate: { max: 30 },
//           aspectRatio: 1,
//         }}

//         onResult={(data) => handleScan(data)}
        
//       />
//       {result ? "kosong": <p>Scanned barcode: {result}</p>}
//     </div>
//   );
// }

// export default BarcodeScanner;

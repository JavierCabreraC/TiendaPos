// import { useState } from 'react';
// import { ReciboPendiente } from '@/types/admin';
// // import { PaymentModal } from '@/components/admin/index.admincomp';
// import { Button, Column, DataTable, Input } from "@/components/ui/index.ui";


// interface RecibosPendientesFormProps {
//     isLoading: boolean;
//     onSubmit: (ci: string) => Promise<void>;
//     recibos: ReciboPendiente[];
// }

// export const RecibosPendientesForm: React.FC<RecibosPendientesFormProps> = ({
//     isLoading,
//     onSubmit,
//     recibos
// }) => {
//     const [ci, setCI] = useState('');
//     // const [showPaymentModal, setShowPaymentModal] = useState(false);
//     // const [selectedRecibo, setSelectedRecibo] = useState<ReciboPendiente | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         await onSubmit(ci);
//     };

//     // const handlePagar = (recibo: ReciboPendiente) => {
//     //     setSelectedRecibo(recibo);
//     //     setShowPaymentModal(true);
//     // };

//     // const handlePaymentSuccess = () => {
//     //     setShowPaymentModal(false);
//     //     setSelectedRecibo(null);
//     //     onSubmit(ci); // Recargar la lista
//     // };

//     const columns: Column<ReciboPendiente>[] = [
//         { key: 'ReciboID', header: 'ID' },
//         { 
//             key: 'FechaEmision', 
//             header: 'Fecha',
//             render: (recibo) => new Date(recibo.FechaEmision).toLocaleString()
//         },
//         { 
//             key: 'Total', 
//             header: 'Total',
//             render: (recibo) => `Bs. ${recibo.Total}`
//         },
//         { 
//             key: 'Detalles', 
//             header: 'Servicios',
//             render: (recibo) => recibo.Detalles.join(', ')
//         },
//         {
//             key: 'actions',
//             header: 'Acciones',
//             render: (recibo) => (
//                 <Button
//                     onClick={() => handlePagar(recibo)}
//                     className="bg-green-500 hover:bg-green-600"
//                 >
//                     Pagar
//                 </Button>
//             )
//         }
//     ];

//     const renderMobileCard = (recibo: ReciboPendiente) => (
//         <div key={recibo.ReciboID} className="bg-white rounded-lg shadow-md p-4 mb-4">
//             <div className="mb-2">
//                 <span className="font-semibold">ID: </span>
//                 <span>{recibo.ReciboID}</span>
//             </div>
//             <div className="mb-2">
//                 <span className="font-semibold">Fecha: </span>
//                 <span>{new Date(recibo.FechaEmision).toLocaleString()}</span>
//             </div>
//             <div className="mb-2">
//                 <span className="font-semibold">Total: </span>
//                 <span>Bs. {recibo.Total}</span>
//             </div>
//             <div className="mb-2">
//                 <span className="font-semibold">Servicios: </span>
//                 <span>{recibo.Detalles.join(', ')}</span>
//             </div>
//             <Button
//                 onClick={() => handlePagar(recibo)}
//                 className="w-full bg-green-500 hover:bg-green-600 mt-2"
//             >
//                 Pagar
//             </Button>
//         </div>
//     );

//     return (
//         <div className="space-y-6">
//             <form onSubmit={handleSubmit} className="max-w-md space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Número de Carnet del Cliente
//                     </label>
//                     <Input
//                         type="text"
//                         value={ci}
//                         onChange={(e) => setCI(e.target.value)}
//                         placeholder="Ingrese número de carnet"
//                         required
//                     />
//                 </div>
//                 <Button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Buscando...' : 'Buscar Recibos'}
//                 </Button>
//             </form>

//             {recibos.length > 0 && (
//                 <DataTable
//                     data={recibos}
//                     columns={columns}
//                     renderMobileCard={renderMobileCard}
//                 />
//             )}

//             {/* {showPaymentModal && selectedRecibo && (
//                 <PaymentModal
//                     reciboId={selectedRecibo.ReciboID}
//                     amount={parseFloat(selectedRecibo.Total)}
//                     onClose={() => {
//                         setShowPaymentModal(false);
//                         setSelectedRecibo(null);
//                     }}
//                     onSuccess={handlePaymentSuccess}
//                 />
//             )} */}
//         </div>
//     );
// };

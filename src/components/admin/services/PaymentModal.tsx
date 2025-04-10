import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';


interface PaymentModalProps {
    reciboId: number;
    amount: number;
    onClose: () => void;
    onSuccess: () => void;
}

interface PaymentIntentResponse {
    clientSecret: string;
}

// Llave pública de Stripe:
const stripePromise = loadStripe('pk_test_51QPOkbGY4So1lVjeXOLxQtWyH8hml9PnmggeExylxboiWpdX1uIQ2TT9kPEi6Ungb2hNFko33o0JCPIPRvbsYgah00jRxw4x5H');

const PaymentForm = ({ reciboId, onSuccess, onClose }: PaymentModalProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setError(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin,
                },
                redirect: 'if_required'
            });

            if (error) {
                setError(error.message || 'Error en el pago');
                return;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                try {
                    await ApiService.fetch(
                        API_CONFIG.ENDPOINTS.ADM_STRIPECONFIRM,
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                ReciboID: reciboId,
                                TransactionID: paymentIntent.id,
                            })
                        }
                    );
                    onSuccess();
                } catch (confirmError) {
                    console.error('Error al confirmar pago:', confirmError);
                    setError('Error al confirmar el pago en el sistema');
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al procesar el pago');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose} disabled={isLoading}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || !stripe}>
                    {isLoading ? 'Procesando...' : 'Pagar'}
                </Button>
            </div>
        </form>
    );
};

export const PaymentModal: React.FC<PaymentModalProps> = (props) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const data = await ApiService.fetch<PaymentIntentResponse>(
                    API_CONFIG.ENDPOINTS.ADM_STRIPECREAR,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            ReciboID: Number(props.reciboId),
                            Amount: Number(props.amount)
                        })
                    }
                );
                
                console.log('Respuesta del servidor:', data);
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error('Error al obtener client secret:', err);
                setError('Error al iniciar el proceso de pago');
            }
        };

        getClientSecret();
    }, [props.reciboId, props.amount]);

    if (error) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
                    <p>{error}</p>
                    <Button onClick={props.onClose} className="mt-4">
                        Cerrar
                    </Button>
                </div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Iniciando pago...</h2>
                    <div className="animate-pulse">Cargando formulario de pago...</div>
                </div>
            </div>
        );
    }

    const appearance = {
        theme: 'stripe' as const,
        // Acá se puede personalizar máss la apariencia
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Pagar Recibo</h2>
                <Elements stripe={stripePromise} options={options}>
                    <PaymentForm {...props} />
                </Elements>
            </div>
        </div>
    );
};

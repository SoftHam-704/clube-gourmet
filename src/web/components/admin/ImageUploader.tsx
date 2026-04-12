import React, { useState, useRef } from "react";
import { FiUploadCloud, FiX, FiCheckCircle } from "react-icons/fi";

interface ImageUploaderProps {
    label: string;
    onImageProcessed: (base64: string) => void;
    currentImage?: string | null;
}

export const ImageUploader = ({ label, onImageProcessed, currentImage }: ImageUploaderProps) => {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    
                    // Só redimensiona se for maior que o máximo
                    if (img.width > MAX_WIDTH) {
                        canvas.width = MAX_WIDTH;
                        canvas.height = img.height * scaleSize;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }

                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Compressão para JPEG (ou WebP se quiser economizar ainda mais)
                    const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                    resolve(dataUrl);
                };
            };
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const compressedBase64 = await compressImage(file);
            setPreview(compressedBase64);
            onImageProcessed(compressedBase64);
        } catch (error) {
            console.error("Erro ao processar imagem:", error);
        } finally {
            setLoading(false);
        }
    };

    const clearImage = () => {
        setPreview(null);
        onImageProcessed("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col gap-3">
            <label className="text-gold/60 font-body text-xs tracking-widest uppercase font-bold">{label}</label>
            
            <div 
                className={`relative h-40 rounded-2xl border-2 border-dashed transition-all duration-500 overflow-hidden flex flex-col items-center justify-center cursor-pointer group
                    ${preview ? 'border-gold/40' : 'border-gold/10 hover:border-gold/30 bg-gold/5'}`}
                onClick={() => !preview && fileInputRef.current?.click()}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button 
                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                className="p-3 bg-gold text-background rounded-full hover:scale-110 transition-transform"
                            >
                                <FiUploadCloud size={20} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                        ) : (
                            <>
                                <FiUploadCloud size={32} className="text-gold/40 group-hover:text-gold transition-colors" />
                                <span className="text-gold/40 font-body text-[10px] uppercase font-bold tracking-widest group-hover:text-gold">Anexar Imagem</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            {preview && !loading && (
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest animate-fade-in">
                    <FiCheckCircle /> Compactada com Sucesso
                </div>
            )}
            
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
            />
        </div>
    );
};

"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileJson, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { uploadFinancialFile } from "@/services/import.service";

interface FinancialFileUploadProps {
    onSuccess?: () => void;
}

export default function FinancialFileUpload({
    onSuccess,
}: FinancialFileUploadProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const selectedFile = event.target.files?.[0];

        setError(null);
        setSuccess(false);

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (
            selectedFile.type !== "application/json" &&
            !selectedFile.name.endsWith(".json")
        ) {
            setFile(null);
            setError("Please select a JSON file.");
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {

        if (!file) {
            setError("Please select a JSON file first.");
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {

            await uploadFinancialFile(file);

            setSuccess(true);
            setFile(null);

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            onSuccess?.();

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload file."
            );

        } finally {

            setUploading(false);

        }
    };

    const removeFile = () => {

        setFile(null);
        setError(null);
        setSuccess(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Upload Financial Data
                </CardTitle>

                <CardDescription>
                    Upload a JSON file containing financial data.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!file ? (

                    <button
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition-colors hover:bg-accent"
                    >

                        <FileJson className="mb-3 size-8 text-muted-foreground" />

                        <p className="font-medium">
                            Select JSON file
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Click here to browse your files
                        </p>

                    </button>

                ) : (

                    <div className="flex items-center justify-between rounded-lg border p-4">

                        <div className="flex min-w-0 items-center gap-3">

                            <FileJson className="size-6 shrink-0 text-muted-foreground" />

                            <div className="min-w-0">

                                <p className="truncate font-medium">
                                    {file.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>

                            </div>

                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
                            disabled={uploading}
                        >
                            <X className="size-4" />
                        </Button>

                    </div>

                )}

                {error && (

                    <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                        <CheckCircle2 className="size-4" />
                        Financial data uploaded successfully.
                    </div>

                )}

                <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="w-full"
                >

                    <Upload className="mr-2 size-4" />

                    {uploading
                        ? "Uploading..."
                        : "Upload Financial Data"}

                </Button>

            </CardContent>

        </Card>
    );
}

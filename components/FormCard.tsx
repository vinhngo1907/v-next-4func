"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit, FaTrash, FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { DeleteForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Form } from "@prisma/client";

export default function FormCard({ form }: { form: Form }) {
    const router = useRouter();

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this draft form?")) return;
        try {
            await DeleteForm(form.id);
            toast({
                title: "Success",
                description: "Your form has been deleted",
            });
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{form.name}</span>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.published && (
                        <span className="flex items-center gap-2">
                            <LuView className="text-muted-foreground" />
                            <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                            <span>{form.submissions.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter className="flex gap-2">
                {form.published && (
                    <Button asChild
                        // className="w-full mt-2 text-md gap-4"
                        className="flex-1 flex items-center justify-center gap-2 text-sm"
                    >
                        <Link href={`/forms/${form.id}`}>
                            View submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <>
                        <Button asChild variant={"secondary"}
                            // className="w-full mt-2 text-md gap-4"
                            className="flex-1 flex items-center justify-center gap-2 text-sm"
                        >
                            <Link href={`/builder/${form.id}`}>
                                Edit form <FaEdit />
                            </Link>
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant={"destructive"}
                            // className="w-full text-md gap-4"
                            className="flex-1 flex items-center justify-center gap-2 text-sm"
                        >
                            Delete form <FaTrash />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}

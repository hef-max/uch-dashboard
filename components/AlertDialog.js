'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/alert-dialog"

export default function AlertDialogComponent({
    alertDialogTitle, 
    alertDialogDesc,
    alertDialogCancel,
    alertDialogAction,
    onActionClick,
    actionButtonColor,
    children
    }) {

    const handleActionClick = () => {
        if (onActionClick) {
            onActionClick();
        }
    };

    return(
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full">
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-black'>{alertDialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{alertDialogDesc}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-black'>{alertDialogCancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleActionClick} className={`${actionButtonColor} bg-indigo-900`}>{alertDialogAction}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
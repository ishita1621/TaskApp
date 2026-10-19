import { useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import AppDialogTitle from "./common/AppDialogTitle";
import AppTextField from "./common/AppTextField";
import AppCloseButton from "./common/AppCloseButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AppButton from "./common/AppButton";


const validationSchema = Yup.object({
    fullName: Yup.string().trim().min(3, "atleast 3 letters").required("Full name required"),
});

export type UserDetails = {
    fullName: string;
};

type UserDetailsType = {
    open: boolean;
    onClose: () => void;
    onSave: (values: UserDetails) => void;
}
export default function UserDetails2({
    open,
    onClose,
    onSave,
}: UserDetailsType) {
    const formik = useFormik<UserDetails>({
        initialValues: {
            fullName: ''
        },

        validationSchema,

        onSubmit: (values, { resetForm }) => {
            const user = {
                ...values,
                fullName: values.fullName.trim(),
            };

            onSave(user);
            resetForm();
            onClose();
        },

    });
    return (
        <Dialog
          open= { open }
          onClose = { onClose }
          fullWidth
          maxWidth = 'sm'
        >
        <AppDialogTitle id="user-details-title" >
            User Details
        </AppDialogTitle>
        <AppCloseButton onClick={onClose} />

         <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers>
                    <AppTextField
                        label="Full Name"
                        {...formik.getFieldProps("fullName")}
                        error={
                            formik.touched.fullName &&
                            Boolean(formik.errors.fullName)
                        }
                        helperText={
                            formik.touched.fullName
                                ? formik.errors.fullName
                                : ""
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <AppButton
                        type="button"
                        color="inherit"
                        onClick={() => {
                            formik.resetForm();
                            onClose();
                        }}
                    >
                        Cancel
                    </AppButton>

                    <AppButton
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        Save Details
                    </AppButton>
                </DialogActions>
            </form>
        </Dialog>
    );

}


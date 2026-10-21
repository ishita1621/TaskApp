import { useFormik } from "formik";
import * as Yup from "yup";
import AppTextField from "../components/common/AppTextField";
import AppButton from "../components/common/AppButton"
import Typography from "@mui/material/Typography";
import AppBox from "../components/common/AppBox"
import { authenticateUser } from "../services/AuthStorage";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email address")
        .required("Email is required"),

    password: Yup.string()
        .required("password is required")
        .min(8, "Password must be atleast 8 charactes long")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase')
        .matches(/[A-Z]/, 'Password requires a uppercase'),
});


type LoginFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,

        onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
            const isAuthenticated = authenticateUser(
                values.email,
                values.password
            );
            if (!isAuthenticated) {
                setStatus("Invalid credentials");
                setSubmitting(false);
                return;
            }
            setStatus(undefined);
            localStorage.setItem("isAuthenticated", "true");
            resetForm();
            navigate("/dashboard");
            setSubmitting(false);


        },
    });

    return (
        <AppBox
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f4f6fb",
                p: 2,
            }}
        >
            <AppBox
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    bgcolor: "#ffffff",
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 1 }}
                >
                    Log In
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Welcome back! Please enter your details.
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <AppTextField
                        label="Email address"
                        type="email"
                        {...formik.getFieldProps("email")}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={
                            formik.touched.email ? formik.errors.email : ""
                        }
                    />

                    <AppTextField
                        label="Password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        error={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password ? formik.errors.password : ""
                        }

                    />
                    {formik.status && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {formik.status}
                        </Typography>
                    )}

                    <AppBox sx={{ display: "flex", justifyContent: "center", }}>
                        <AppButton
                            type="submit"
                            sx={{
                                width: "100%",
                                py: 1.3,
                                borderRadius: 2,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
                            Log In
                        </AppButton>
                    </AppBox>
                </form>
            </AppBox>
        </AppBox>
    );
}
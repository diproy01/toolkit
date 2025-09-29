"use client";
import { Box, Button, Container, Link, Paper, TextField, Alert, Toolbar, AppBar, Typography } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const createLoginSchema = () => z.object({
    mail: z.string().min(1, 'Invalid email ID'),
    password: z.string().min(1, 'Invalid Password'),
});

export default function LoginForm({ userType }: { userType?: string }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isMessage = searchParams.get("message") || "";
    const callbackUrl = searchParams.get("callbackUrl") || "/home";
    const [errorMessage, setErrorMessage] = useState("");
    // Redirect if user is already logged in
    useEffect(() => {
        if (status === "authenticated") {
            router.push(callbackUrl);
        }
        if (isMessage) {
            setErrorMessage(isMessage);
        }
    }, [status, router, callbackUrl]);

    const loginSchema = createLoginSchema();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        const result = await signIn("credentials", {
            redirect: false,
            mail: data.mail,
            password: data.password,
            callbackUrl,
            userType: userType ? userType : "user"  //User type from admin-login page 'admin' and login page 'user', default is 'user'
        });
        if (result?.error) {
            setErrorMessage("Invalid Login ID or Password");
            // setTimeout(() => setErrorMessage(""), 3000);
        } else {
            setErrorMessage("Success!!");
            router.push(result?.url || callbackUrl);
        }

    };
    return (
        <Box display="flex" flexDirection="column">
            <Box sx={{ flexGrow: 1, display: "flex", marginBottom: 10 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme: any) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>ToolKit</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={{ padding: 8, marginTop: "12vh" }}>
                    {errorMessage && <Alert severity={isMessage ? "success" : "error"}>{errorMessage}</Alert>}
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Box mb={0} p={1}>
                            ●Login ID
                        </Box>
                        <Box display="flex" justifyContent="center" p={1}>
                            <TextField
                                {...register("mail")}
                                id="mail"
                                variant="outlined"
                                sx={{ width: "400px" }}
                                error={!!errors.mail}
                                helperText={errors.mail?.message}
                            />
                        </Box>
                        <Box mb={0} p={1}>
                            ●Password
                        </Box>
                        <Box display="flex" justifyContent="center" p={1}>
                            <TextField
                                {...register("password")}
                                id="password"
                                variant="outlined"
                                type="password"
                                sx={{ width: "400px" }}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Box>
                        {userType != "admin" ? (
                            <Box mb={0} p={1}>
                                <Link href="/password-reset" target="_blank" rel="noopener" underline="none">
                                    Forgot password
                                </Link>
                            </Box>
                        ) : null}

                        <Box display="flex" justifyContent="center" p={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: "150px" }}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}

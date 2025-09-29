"use client";
import {
    AppBar,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
export default function Home() {
    return (
        <Container maxWidth="md" sx={{ marginY: 3 }}>
            <Paper sx={{ border: "1px solid gray", paddingBottom: 8 }}>
                <AppBar position="static">
                    <Typography component="div">ToolKit Home</Typography>
                </AppBar>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                    <Table sx={{ border: "none" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell width={"30%"} sx={{ borderBottom: "none" }}>
                                    <Link
                                        href="#"
                                        target="_blank"
                                        rel="noopener"
                                        color="secondary"
                                    >
                                        Date & Time
                                    </Link>
                                </TableCell>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <Link
                                        href="#"
                                        target="_blank"
                                        rel="noopener"
                                        color="secondary"
                                    >
                                        Title
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={"30%"} sx={{ borderBottom: "none" }}>
                                    <Link
                                        href="#"
                                        target="_blank"
                                        rel="noopener"
                                        color="secondary"
                                    >
                                        Date & Time
                                    </Link>
                                </TableCell>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <Link
                                        href="#"
                                        target="_blank"
                                        rel="noopener"
                                        color="secondary"
                                    >
                                        Title
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
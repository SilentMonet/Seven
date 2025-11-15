import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";

// /workspaces/Seven/src/components/Page.tsx

export interface PageProps {
    title: string;
    showBack?: boolean;
    right?: React.ReactNode;
    children?: React.ReactNode;
    headerSx?: SxProps<Theme>;
    contentSx?: SxProps<Theme>;
}

/**
 * Page component
 * - full width & height (100%)
 * - header with optional back button (default: shown), title (ellipsis when too long)
 * - right side area for custom elements
 * - content fills remaining space and is scrollable
 * - uses MUI components
 */
export default function Page({
    title,
    showBack = true,
    right,
    children,
    headerSx,
    contentSx,
}: PageProps) {
    const navigate = useNavigate(); // Initialize navigate

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                // allow children flex items to shrink properly so scroll works inside containers
                minHeight: 0,
            }}
        >
            <AppBar
                position="static"
                elevation={0}
                color="transparent"
                sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    backgroundColor: "transparent",
                    ...headerSx,
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        px: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {showBack ? (
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => navigate(-1)} // Default back navigation
                            aria-label="back"
                            size="large"
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    ) : null}

                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        title={title}
                    >
                        {title}
                    </Typography>

                    <Box sx={{ ml: 1, display: "flex", alignItems: "center", gap: 1 }}>
                        {right}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    flex: "1 1 auto",
                    overflow: "auto",
                    // ensure scroll children can shrink inside flex parent
                    minHeight: 0,
                    ...contentSx,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
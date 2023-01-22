import './index.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, Outlet } from "react-router-dom";

export const Root = () => {
    return (
        <div id="main">
            <h1>住宅ローン控除計算ツール</h1>
            <Box sx={{ display: 'block', p: 1, m: 1 }}>
                <ButtonGroup size="large" aria-label="large button group">
                    <Button>
                        <Link to={`/`}>TOP</Link>
                    </Button>
                    <Button>
                        <Link to={`/new/easy`}>簡易版（新規購入）</Link>
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ display: 'block', p: 1, m: 1 }}>
                <Outlet />
            </Box>
        </div>
    );
}

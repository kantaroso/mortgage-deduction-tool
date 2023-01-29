import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Link } from "react-router-dom";

export const RootChild = () => {
    return (
        <div>
            <h2>機能一覧</h2>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Link to={`/new/easy`}>簡易版（新規購入）</Link>
                            </TableCell>
                            <TableCell>新規購入する場合の控除額の計算（簡易版）</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                簡易版（購入済み）
                            </TableCell>
                            <TableCell>今年もらえる控除額の計算（簡易版）</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

import React from 'react';
import { Result2022 } from './result2022.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const NewEasy = () => {
  const [inputs, setInputs] = React.useState({
    'total-loan': '',
    'income-tax': '',
    'resident-tax': '',
    'scheduled-move-yaer': '',
    'house-type': '',
  });
  const [open, setOpen] = React.useState(false);
  const [resultText, setResultText] = React.useState('');
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputs({ ...inputs, [name]: value });
  }
  function validate() {
    if (!inputs['total-loan']) {
      return false;
    }
    if (!inputs['income-tax']) {
      return false;
    }
    if (!inputs['resident-tax']) {
      return false;
    }
    if (!inputs['scheduled-move-yaer']) {
      return false;
    }
    if (!inputs['house-type']) {
      return false;
    }
    return true;
  }
  const selectHouseTypeList = {
    1: {
      'label': '認定住宅（認定長期優良住宅、認定低炭素住宅）',
    },
    2: {
      'label': '特定エネルギー消費性能向上住宅',
    },
    3: {
      'label': 'エネルギー消費性能向上住宅',
    },
    4: {
      'label': 'その他',
    },
  }
  const selectYearTypeList = {
    //1: {
    //  'label': '2014~',
    //},
    2: {
      'label': '2022~',
    },
    3: {
      'label': '2024~',
    },
  }

  function calcTax() {
    if (!validate()) {
      setResultText('入力エラーです');
      handleOpen();
      return;
    }
    let result = '';
    switch (inputs['scheduled-move-yaer']) {
      case '1':
        result = calc2014();
        break;
      case '2':
      case '3':
        result = calc2022();
        break;
      default:
        setResultText('入力エラーです');
        handleOpen();
        return;
    }
    setResultText(result);
    handleOpen();
    return;
  }

  // https://magazine.aruhi-corp.co.jp/0000-3328/
  function calc2014() {
    return '<p>控除額：¥0</p>';
  }
  // https://www.youtube.com/watch?v=XkLamy_qhT8
  // https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1211-1.htm
  function calc2022() {
    // 一旦かなり大きな金額を入れる

    // テスト用
    // 年収別所得税
    // https://mymo-ibank.com/money/5554#toc2
    // 400: 85920 14566
    // 500: 140365 20241
    // 600: 213872 27141
    // 700: 314649 31333
    // 800: 483622 38383
    let result = 100000000;
    const deductionAmount_2022 = {
      1: 5000,
      2: 4500,
      3: 4000,
      4: 3000,
    }
    const deductionAmount_2024 = {
      1: 4500,
      2: 3500,
      3: 3000,
      4: 0,
    }

    // 借入額による上限
    const val1 = Math.floor(inputs['total-loan'] * 10000 * 0.007);
    if (result > val1) {
      result = val1;
    }
    // 住宅の種類による上限
    let deductionAmount = deductionAmount_2024;
    if (inputs['scheduled-move-yaer'] === '2') {
      deductionAmount = deductionAmount_2022;
    }
    const val2 = deductionAmount[inputs['house-type']] * 10000 * 0.007;
    if (result > val2) {
      result = val2;
    }
    // 収入による上限
    let val3 = 0
    if (Math.floor(inputs['resident-tax'] * 6) > 97500) {
      val3 = 97500 + parseInt(inputs['income-tax']);
    } else {
      val3 = Math.floor(inputs['resident-tax'] * 6) + parseInt(inputs['income-tax']);
    }
    if (result > val3) {
      result = val3;
    }
    return <Result2022 result={result} val1={val1} val2={val2} val3={val3}/>;
  }
  return (
    <Box>
      <h2>簡易版（新規購入）</h2>
      <Button variant='contained' onClick={calcTax}>計算</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            計算結果
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {resultText}
          </Typography>
        </Box>
      </Modal>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>借入額（もしくは借入残高）</TableCell>
              <TableCell>
                <FormControl required>
                  <TextField
                    id='total-loan'
                    name='total-loan'
                    value={inputs['total-loan']}
                    onChange={handleInputChange}
                    type='number'
                    label='XXXX万円'
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>所得税（源泉徴収税額）</TableCell>
              <TableCell>
                <FormControl required>
                  <TextField
                    id='income-tax'
                    name='income-tax'
                    value={inputs['income-tax']}
                    onChange={handleInputChange}
                    type='number'
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>住民税（1ヶ月分）</TableCell>
              <TableCell>
                <FormControl required>
                  <TextField
                    id='resident-tax'
                    name='resident-tax'
                    value={inputs['resident-tax']}
                    onChange={handleInputChange}
                    type='number'
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>入居予定年</TableCell>
              <TableCell>
                <FormControl required sx={{ width: 100 }}>
                  <Select
                    id='scheduled-move-yaer'
                    name='scheduled-move-yaer'
                    value={inputs['scheduled-move-yaer']}
                    onChange={handleInputChange}
                  >
                    {Object.keys(selectYearTypeList).map((i) =>
                      <MenuItem value={i} key={i}>{selectYearTypeList[i].label}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>住宅の種類</TableCell>
              <TableCell>
                <FormControl required sx={{ width: 500 }}>
                  <Select
                    id='house-type'
                    name='house-type'
                    value={inputs['house-type']}
                    onChange={handleInputChange}
                  >
                    {Object.keys(selectHouseTypeList).map((i) =>
                      <MenuItem value={i} key={i}>{selectHouseTypeList[i].label}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

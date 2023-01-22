export const Result2022 = (props) => {
    return (
      <div>
        <p>控除額 : ¥{props.result.toLocaleString()}</p>
        <p>借入額での控除限度額 : ¥{props.val1.toLocaleString()}</p>
        <p>住宅の種類での控除限度額 : ¥{props.val2.toLocaleString()}</p>
        <p>所得での控除限度額 : ¥{props.val3.toLocaleString()}</p>
      </div>
    );
  }

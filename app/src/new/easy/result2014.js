export const Result2014 = (props) => {
    return (
      <div>
        <p>控除額:{Mathprops.result.toLocaleString()}</p>
        <p>借入額の控除限度額:{props.val1.toLocaleString()}</p>
        <p>住居の控除限度額:{props.val2.toLocaleString()}</p>
        <p>所得の控除限度額:{props.val3.toLocaleString()}</p>
      </div>
    );
  }

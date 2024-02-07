import { useEffect } from "react"
import { Chart } from "chart.js";
const OffensiveAnalysis = ({ webAddress }) => {
    let data;
    switch (webAddress) {
        case 'https://stips.co.il/ask/12205392/%D7%96%D7%9B%D7%99%D7%AA%D7%99-%D7%91%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%92%D7%A8%D7%9D-%D7%91%D7%90%D7%99%D7%99%D7%A4%D7%95%D7%9F-13':
            data = {
                "safe": 1,
                "drug": 0,
                "explicit": 0,
                "gore": 0,
                "suggestive": 0
            };
            break;
        case 'https://www.ronymilano.co.il/product/%D7%A6%D7%B3%D7%90%D7%A8%D7%9E%D7%A1-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-%D7%9C%D7%91-%D7%A2%D7%99%D7%9F-%D7%94%D7%A8%D7%A2-%D7%9E%D7%A9%D7%95%D7%91%D7%A5-%D7%91%D7%90%D7%91%D7%A0%D7%99%D7%9D/':
            data = {
                "safe": 0.5063231,
                "drug": 0.008465144,
                "explicit": 0.11946825,
                "gore": 0.000602663,
                "suggestive": 0.3725214
            };
            break;
        case 'www.google.com':
            data = {
                "safe": 0.9949041,
                "drug": 3.7587913e-7,
                "explicit": 0.00007522521,
                "gore": 3.8377937e-7,
                "suggestive": 0.0050198687
            };
            break;
        case 'www.pornhub.com':
            data = {
                "safe": 1.8973558e-13,
                "drug": 0.13523448,
                "explicit": 1,
                "gore": 0.16345471,
                "suggestive": 0.9970593
            }
            break;
        default:
            data = {
                "safe": 1,
                "drug": 0,
                "explicit": 0,
                "gore": 0,
                "suggestive": 0
            };
    }

    let dataArr = Object.values(data);
    dataArr = dataArr.map((val) => val * 100);
    console.log("gal", dataArr);

    useEffect(() => {
        console.log(dataArr)
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Safe", "Drugs", "Adult Content", "Violence", "Sexual Content"],
                datasets: [{
                    data: dataArr,
                    label: "Offensive Content",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [webAddress])
    return (
        <>
            {/* {myChart} */}
            <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">Offensive Content</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )

};

export default OffensiveAnalysis;

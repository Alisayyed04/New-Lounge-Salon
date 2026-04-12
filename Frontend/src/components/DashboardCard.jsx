export default function DashboardCard({ title, value }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "20px",
                minWidth: "150px",
                borderRadius: "10px",
            }}
        >
            <h4>{title}</h4>
            <h2>{value}</h2>
        </div>
    );
}
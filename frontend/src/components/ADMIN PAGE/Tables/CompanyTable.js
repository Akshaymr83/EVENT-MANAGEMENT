import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Tables/table.css'; // Import CSS for styling

const CompanyTable = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/company/companyDetails"); // Replace with the correct endpoint
                setCompanies(response.data.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div className="table-container">
            <h2>Company Details</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Verified</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company._id}>
                            <td>{company.company_name}</td>
                            <td>{company.email}</td>
                            <td>{company.verified ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;

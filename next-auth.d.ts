import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            customer_id: number;
            customer_name: string;
            mail: string;
            first_name: string;
            last_name: string;
            role: string;
            is_ledger: number;
            is_salary: number;
            is_report: number;
            is_sales: number;
            is_systems: number;
            is_admin: number;
            certification_period: Date | string;
            isCertified: boolean;
            certificationStorage: string;
            m_datetime: Date | string;
        };
    }

    interface User {
        id: number;
        customer_id: number;
        customer_name: string;
        mail: string;
        first_name: string;
        last_name: string;
        role: string;
        is_ledger: number;
        is_salary: number;
        is_report: number;
        is_sales: number;
        is_systems: number;
        is_admin: number;
        certification_period: Date | string;
        isCertified: boolean;
        certificationStorage: string;
        m_datetime: Date | string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: number;
        user_id: number;
        customer_id: number;
        customer_name: string;
        mail: string;
        first_name: string;
        last_name: string;
        role: string;
        is_ledger: number;
        is_salary: number;
        is_report: number;
        is_sales: number;
        is_systems: number;
        is_admin: number;
        certification_period: Date | string;
        isCertified: boolean;
        certificationStorage: string;
        m_datetime: Date | string;
    }
}

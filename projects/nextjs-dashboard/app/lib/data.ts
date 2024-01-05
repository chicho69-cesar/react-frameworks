import { unstable_noStore as noStore } from 'next/cache'
import { sql } from '@vercel/postgres'

import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions'
import { formatCurrency } from './utils'

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()

  console.log('Fetching revenue data...')
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const revenues: Revenue[] = [
    {
      month: 'Jan',
      revenue: 9000
    },
    {
      month: 'Feb',
      revenue: 7600
    },
    {
      month: 'Mar',
      revenue: 2500
    },
    {
      month: 'Apr',
      revenue: 3000
    },
    {
      month: 'May',
      revenue: 7600
    },
    {
      month: 'Jun',
      revenue: 4800
    },
    {
      month: 'Jul',
      revenue: 6000
    },
    {
      month: 'Aug',
      revenue: 6000
    },
    {
      month: 'Sep',
      revenue: 3000
    },
    {
      month: 'Oct',
      revenue: 8200
    },
    {
      month: 'Nov',
      revenue: 8250
    },
    {
      month: 'Dec',
      revenue: 4200
    }
  ]

  console.log('Data fetch completed after 3 seconds.')

  return revenues
  
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await sql<Revenue>`SELECT * FROM revenue`

    console.log('Data fetch completed after 3 seconds.')

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export async function fetchLatestInvoices() {
  noStore()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const latestInvoices: any[] = [
    {
      amount: '$10,000',
      email: 'cesar@gmail.com',
      id: '1',
      image_url: 'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
      name: 'Cesar',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: '$5,000',
      email: 'hector@gmail.com',
      id: '2',
      image_url: 'https://i.pinimg.com/originals/14/f3/18/14f31893d67ac33bbbe2d72e4d32fff9.png',
      name: 'Hector',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: '$7,200',
      email: 'aranzazu@gmail.com',
      id: '3',
      image_url: 'https://i.pinimg.com/originals/07/60/ff/0760ff64144783c7fefeb5f0d6d7c379.png',
      name: 'Aranzazu',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: '$2,100',
      email: 'manuel@gmail.com',
      id: '4',
      image_url: 'https://i.pinimg.com/originals/2c/7f/d3/2c7fd35e35e5a1f6d6de2e11dfcf1d0b.png',
      name: 'Manuel',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: '$1,900',
      email: 'luis@gmail.com',
      id: '5',
      image_url: 'https://i.pinimg.com/originals/02/9e/98/029e986f486e2a45565b4606b388ef54.png',
      name: 'Luis',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    }
  ]

  return latestInvoices

  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }))
    return latestInvoices
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

export async function fetchCardData() {
  noStore()

  return {
    numberOfCustomers: 8,
    numberOfInvoices: 15,
    totalPaidInvoices: 110600.36,
    totalPendingInvoices: 133900.11,
  }

  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0')
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0')
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0')
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0')

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore()

  const filteredInvoices: InvoicesTable[] = [
    {
      amount: 1900,
      email: 'cesar@gmail.com',
      id: '1',
      image_url: 'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
      name: 'Cesar',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: 5000,
      email: 'hector@gmail.com',
      id: '2',
      image_url: 'https://i.pinimg.com/originals/14/f3/18/14f31893d67ac33bbbe2d72e4d32fff9.png',
      name: 'Hector',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'pending'
    },
    {
      amount: 7200,
      email: 'aranzazu@gmail.com',
      id: '3',
      image_url: 'https://i.pinimg.com/originals/07/60/ff/0760ff64144783c7fefeb5f0d6d7c379.png',
      name: 'Aranzazu',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    },
    {
      amount: 2100,
      email: 'manuel@gmail.com',
      id: '4',
      image_url: 'https://i.pinimg.com/originals/2c/7f/d3/2c7fd35e35e5a1f6d6de2e11dfcf1d0b.png',
      name: 'Manuel',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'pending'
    },
    {
      amount: 1900,
      email: 'luis@gmail.com',
      id: '5',
      image_url: 'https://i.pinimg.com/originals/02/9e/98/029e986f486e2a45565b4606b388ef54.png',
      name: 'Luis',
      customer_id: '1234',
      date: '2024-01-04',
      status: 'paid'
    }
  ]

  return filteredInvoices

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return invoices.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore()

  return 5

  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of invoices.')
  }
}

export async function fetchInvoiceById(id: string) {
  noStore()

  return {
    amount: 1900,
    id: '1',
    customer_id: '1234',
    status: 'paid'
  } as InvoiceForm

  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }))

    return invoice[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}

export async function fetchCustomers() {
  noStore()

  return [
    {
      id: '1',
      name: 'Cesar'
    },
    {
      id: '2',
      name: 'Hector'
    },
    {
      id: '3',
      name: 'Aranzazu'
    },
    {
      id: '4',
      name: 'Manuel'
    },
    {
      id: '5',
      name: 'Luis'
    }
  ] as CustomerField[]

  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows
    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all customers.')
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore()

  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }))

    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch customer table.')
  }
}

export async function getUser(email: string) {
  noStore()

  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`
    return user.rows[0] as User
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

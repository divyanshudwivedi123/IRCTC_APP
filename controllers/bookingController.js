import db from '../config/db.js';

export const bookSeats = async (req, res) => {
    const { trainId, seatsToBook } = req.body;

    if (!trainId || !seatsToBook) {
        return res.status(400).json({ message: 'Train ID and number of seats are required' });
    }

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const trainResult = await client.query('select available_seats from trains where id = $1 for update', [trainId]);
        const availableSeats = trainResult.rows[0].available_seats;

        if (availableSeats < seatsToBook) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        await client.query('update trains set available_seats = available_seats - $1 where id = $2', [seatsToBook, trainId]);

        await client.query('insert into bookings (train_id, user_id, seats_booked) values ($1, $2, $3)', [trainId, req.user.userId, seatsToBook]);

        await client.query('COMMIT');
        res.status(200).json({ message: 'Seats booked successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error booking seats:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.release();
    }
};

export const getUserBookings = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await db.query(
            'SELECT bookings.id, user_id, train_id, trains.source, trains.destination, bookings.seats_booked, bookings.booking_time FROM bookings INNER JOIN trains ON bookings.train_id = trains.id WHERE bookings.user_id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

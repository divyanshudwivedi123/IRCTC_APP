import db from '../config/db.js';

export const addTrain = async (req, res) => {

    const { source, destination, totalSeats, availableSeats } = req.body;

    try {
        const result = await db.query(
            'insert into trains (source, destination, total_seats, available_seats) values ($1, $2, $3, $4) RETURNING id',
            [source, destination, totalSeats, availableSeats]
        );
        res.status(201).json({ message: 'Train added successfully', trainId: result.rows[0].id });
    } catch (error) {
        console.error('Error adding train:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllTrains = async (req, res) => {
    try {
        const result = await db.query('select id, source, destination, available_seats FROM trains');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific train by ID
export const getTrainById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('select * from trains where id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching train by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


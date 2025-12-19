import express from 'express';
import { hashData } from '../utils/hash.js';
import { writeEvent, readEvent } from '../blockchain/civicLedger.js';

const router = express.Router();

// POST → backend → blockchain
router.post('/event', async (req, res) => {
  try {
    const civicData = req.body;

    // 1️⃣ hash data
    const hash = hashData(civicData);

    // 2️⃣ write to blockchain
    const tx = await writeEvent(civicData.type, hash);

    res.json({
      success: true,
      blockchainTx: tx,
      hash,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET → blockchain → user
router.get('/event/:id', async (req, res) => {
  try {
    const event = await readEvent(Number(req.params.id));
    res.json({ event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

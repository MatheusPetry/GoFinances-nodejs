import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('this transaction type is not permited');
    }
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new Error('you have no balance available');
    }

    const repository = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return repository;
  }
}

export default CreateTransactionService;

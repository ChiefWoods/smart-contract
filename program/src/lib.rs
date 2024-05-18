use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let mut accounts_iter = accounts.iter();

    if let Some(account) = accounts_iter.next() {
        if account.owner != program_id {
            msg!("Account info does not match program id");
            return Err(ProgramError::IncorrectProgramId);
        };

        let mut message = String::from_utf8(instruction_data.to_vec()).map_err(|_| {
            msg!("Instruction data is not a valid string");
            ProgramError::InvalidInstructionData
        })?;

        if message.len() > 280 {
            msg!("Message exceeded max length of 280 characters");
            return Err(ProgramError::InvalidInstructionData);
        };

        message = format!("{: <280}", message);

        let acc_data = &mut account.data.borrow_mut()[..];
        message.serialize(&mut acc_data.as_mut())?;

        msg!("Message: {}", message);

        Ok(())
    } else {
        msg!("No accounts provided");
        return Err(ProgramError::NotEnoughAccountKeys);
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MessageAccount {
    pub message: String,
}

entrypoint!(process_instruction);

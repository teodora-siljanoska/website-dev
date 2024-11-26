import { Domain } from '@pages/api/domainSearch';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { useContext } from 'react';

interface P {
  domain: Domain;
  handleNameClick: (newDomain: string) => void;
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'pinned' | 'filtered';
}

const DomainTableRow = ({
  domain,
  handleNameClick,
  handleCheckbox,
  type,
}: P) => {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);

  return (
    <tr
      className={`${type === 'pinned' ? 'bg-lightTeal' : ''} ${
        domain.available.toString() === 'false' ? 'text-pink' : 'text-darkGrey'
      }  hover:bg-purple/10`}
    >
      <td className=" p-4 md:pr-10">
        <input
          type="checkbox"
          id="coding"
          name="interest"
          value={domain.domain || ''}
          onChange={handleCheckbox}
          checked={domain.checked}
        />
      </td>
      <td
        onClick={() => {
          handleNameClick(domain.domain);
        }}
        className=" cursor-pointer p-3 md:pr-32"
      >{`${domain.domain}`}</td>
      {domain.price && (
        <td className=" p-3">
          {currencySymbol}{' '}
          {domain.price.map((item, index) =>
            item.currency === selectedCurrency ? item.register.toFixed(2) : ''
          )}
        </td>
      )}
      {domain.price && (
        <td className=" p-3">
          {currencySymbol}{' '}
          {domain.price.map((item, index) =>
            item.currency === selectedCurrency ? item.renew.toFixed(2) : ''
          )}
        </td>
      )}
    </tr>
  );
};

export default DomainTableRow;

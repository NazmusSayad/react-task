import React, { useRef, useState, useLayoutEffect } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import css from './Problem-2.module.scss'

const Problem2 = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => navigate('/problem-2/all')}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => navigate('/problem-2/us')}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export const Modal = () => {
  const [_search, _setSearch] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isOnlyEven, setIsOnlyEven, isLoading, data] = useData(search, page)
  const [activeContact, setActiveContact] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(_search)
    }, 500)

    return () => clearTimeout(timeout)
  }, [_search])

  function handleScroll(e) {
    const { target } = e
    const scrollBottom = target.scrollTop + target.clientHeight
    if (scrollBottom === target.scrollHeight) {
      setPage((p) => ++p)
    }
  }

  return (
    <Dialog className={css.dialog} onScroll={handleScroll}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.onlyEven}>
            <label htmlFor="only-even">Only even</label>
            <input
              id="only-even"
              type="checkbox"
              checked={isOnlyEven}
              onChange={() => setIsOnlyEven((p) => !p)}
            />
          </div>

          <div>
            <Link className={css.buttonA} to="/problem-2/all">
              All Contacts
            </Link>
            <Link className={css.buttonB} to="/problem-2/us">
              US Contacts
            </Link>
            <Link className={css.buttonC} to="..">
              Close
            </Link>
          </div>
        </div>

        <div className={css.search}>
          <input
            type="text"
            value={_search}
            placeholder="Search any contact here..."
            onChange={(e) => _setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearch(_search)}
          />
        </div>

        <div className={css.content}>
          {isLoading ? (
            'Loading contacts...'
          ) : (
            <table className={css.table}>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>

                {data.map((contact) => {
                  const { name, email, phone, country } = contact
                  return (
                    <tr
                      className={css.pointer}
                      onClick={() => setActiveContact(contact)}
                    >
                      <td>{name}</td>
                      <td>{country}</td>
                      <td>{phone}</td>
                      <td>{email}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {activeContact && (
        <NestedContact
          contact={activeContact}
          close={() => setActiveContact(false)}
        />
      )}
    </Dialog>
  )
}

const NestedContact = ({ contact, close }) => {
  console.log(contact)
  return (
    <Dialog className={css.nestedDialog}>
      <div className={css.nestedHeader}>
        <h4>{contact.name}</h4>
        <button className={css.buttonC} onClick={close}>
          Close
        </button>
      </div>

      <p>Country: {contact.country}</p>
      <p>Phome: {contact.phone}</p>
      <p>Email: {contact.email}</p>

      <br />

      <p>Eos vitae et distinctio dolor a modi fugit deleniti reiciendis?</p>
      <p>Tenetur eos nesciunt fugit neque minus natus reiciendis dicta cum.</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, atque.
      </p>
      <p>
        Fuga voluptas quod quibusdam voluptatum minus laboriosam maxime
        excepturi eum.
      </p>
      <p>
        Assumenda ullam neque aliquid recusandae corrupti deserunt nihil
        quibusdam impedit.
      </p>
    </Dialog>
  )
}

function useData(search, page) {
  const type = useLocation().pathname.split('/').at(-1).toLowerCase()
  const [isOnlyEven, setIsOnlyEven] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const res = await fetch('/contacts.json')
      const data = await res.json()
      setIsLoading(false)

      if (type === 'us') {
        return setData(data.filter((c) => c.country === 'US'))
      }

      setData(data)
    })()
  }, [type])

  const evenData = useMemo(() => {
    if (!isOnlyEven) return data
    return data.filter((_, i) => {
      const number = i + 1
      return number !== 0 && number % 2 === 0
    })
  }, [data, isOnlyEven])

  const dataToShow = useMemo(() => {
    if (!search) return evenData
    return evenData.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [evenData, search])

  const pageTo = page * 20
  return [isOnlyEven, setIsOnlyEven, isLoading, dataToShow.slice(0, pageTo)]
}

const Dialog = (props) => {
  const ref = useRef()

  useLayoutEffect(() => {
    ref.current.close()
    ref.current.showModal()
  }, [])

  return <dialog {...props} ref={ref} />
}

export default Problem2

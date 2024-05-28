import { Nutricionist } from '@/@types'
import puppeteer from 'puppeteer'

interface VerifyCRNSubscriptionResponse {
  valid: boolean
  nutricionist: Nutricionist
}

type ValidSituation = 'ATIVO' | 'TRANSFERIDO'

function isValidSituation(
  situation?: string | null,
): situation is ValidSituation {
  return situation === 'ATIVO' || situation === 'TRANSFERIDO'
}

export async function verifyCRNSubscription(
  subscription: string | null,
): Promise<VerifyCRNSubscriptionResponse | null> {
  if (!subscription) {
    return null
  }

  try {
    const crnSeachInputElement = 'input[name="registro"]'

    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto('http://cnn.cfn.org.br/application/index/consulta-nacional')

    await page.waitForSelector(crnSeachInputElement)

    await page.type(crnSeachInputElement, subscription.toString())

    await page.keyboard.press('Enter')

    await page.waitForSelector('#table > tbody > tr > td', {
      timeout: 1500,
    })

    const search = await page.evaluate(() => {
      const searchResult = document.querySelectorAll(
        'table#table > tbody > tr > td',
      )

      console.log(searchResult)

      const data = {
        name: searchResult[0].textContent,
        subscription: Number(searchResult[1].textContent),
        crn: searchResult[2].textContent,
        situation: searchResult[3].textContent,
        subscriptionType: searchResult[4].textContent,
        lastUpdated: searchResult[5].textContent,
      }

      return data
    })

    await browser.close()

    const nutricionist = {
      name: search.name,
      subscription: search.subscription,
      crn: search.crn,
      situation: search.situation,
      subscriptionType: search.subscriptionType,
      lastUpdated: search.lastUpdated,
    }

    if (!isValidSituation(search.situation)) {
      return {
        valid: false,
        nutricionist,
      }
    }

    return {
      valid: true,
      nutricionist,
    }
  } catch (err) {
    return null
  }
}

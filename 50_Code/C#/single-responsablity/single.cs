public interface IPhoneBaseProperty
{
    string RAM { get; set; }
    string ROM { get; set; }
    string CPU { get; set; }
    int Size { get; set; }
}

public interface IPhoneExtentionProperty
{
    string Pixel { get; set; }
}

public interface IPhoneBaseFunc
{
    void Charging(ElectricSource oElectricsource);
    void RingUp();
    void ReceiveUp();
}

public interface IPhoneExtentionFunc
{
    void SurfInternet();
    void MobileOA();
    void PlayGame();
}

public class MobilePhoneBaseProperty : IPhoneBaseProperty
{
    public string RAM
    {
        get { throw new NotImplementedException(); }
        set { throw new NotImplementedException(); }
    }
    public string ROM
    {
        get { throw new NotImplementedException(); }
        set { throw new NotImplementedException(); }
    }
    public string CPU
    {
        get { throw new NotImplementedException(); }
        set { throw new NotImplementedException(); }
    }
    public int Size
    {
        get { throw new NotImplementedException(); }
        set { throw new NotImplementedException(); }
    }
}

public class MobilePhoneExtentionProperty : IPhoneExtentionProperty
{
    public string Pixel
    {
        get { throw new NotImplementedException(); }
        set { throw new NotImplementedException(); }
    }
}

public class PhoneBaseFunc : IPhoneBaseFunc
{
    public void Charging(ElectricSource oElectricsource)
    {
        throw new NotImplementedException();
    }

    public void RingUp()
    {
        throw new NotImplementedException();
    }

    public void ReceiveUp()
    {
        throw new NotImplementedException();
    }
}

public class PhoneExtentionFunc : IPhoneExtentionFunc
{
    public void SurfInternet()
    {
        throw new NotImplementedException();
    }

    public void MobileOA()
    {
        throw new NotImplementedException();
    }

    public void PlayGame()
    {
        throw new NotImplementedException();
    }
}
